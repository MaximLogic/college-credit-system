<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Professor;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query();

        if(isset($request->id)) {
            $users->where('id', $request->id);
        }
        if(isset($request->search)) {
            $users->where(DB::raw("CONCAT(firstname, ' ', middlename, ' ', lastname)"), 'like', "%$request->search%");
        }
        if(isset($request->role)) {
            $users->where('role', $request->role);
        }

        return Inertia::render('Users/Index', [
            'users' => UserResource::collection($users->paginate(10)),
            'links' => $users->paginate(10)
        ]);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 0)
        {
            $userStudent = Student::where('user_id', $user->id)->first();
            $speciality = Speciality::find($userStudent->speciality_id);
        }

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'selectedSpeciality' => $speciality ?? null,
            'specialities' => Speciality::all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $userRole = $user->role;

        if($userRole !== $request->role) {
            switch ($request->role) {
                case 0:
                    Professor::where('user_id', $id)->delete();
                    Student::create(['user_id' => $id]);
                    break;
                case 1:
                    Student::where('user_id', $id)->delete();
                    Professor::create(['user_id' => $id]);
                    break;
                case 2:
                    Student::where('user_id', $id)->delete();
                    Professor::where('user_id', $id)->delete();
                    break;
            }
        }

        $user->fill($request->toArray());
        $user->save();

        if($user->role === 0) {
            $userStudent = Student::where('user_id', $user->id)->first();
            $userStudent->update(['speciality_id' => $request->speciality]);
        }

        return Redirect::route('users.index')->with('message', 'Successfully updated user information.');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->role !== User::ADMIN_ROLE) {
            $user->delete();
            return Redirect::back()->with('message', 'Successfully deleted user.');
        }
        else {
            return Redirect::back()->with('error', 'You cannot delete admin account.');
        }
    }
}
