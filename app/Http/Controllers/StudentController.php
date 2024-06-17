<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\Professor;
use App\Models\Speciality;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $fullNameQuery = DB::raw("CONCAT(users.firstname, ' ', users.middlename, ' ', users.lastname)");

        $students = Student::join('users', 'students.user_id', '=', 'users.id')
            ->select(['students.*',])
            ->where($fullNameQuery, 'like', "%$request->search%");

        if(isset($request->speciality))
        {
            $students->where('students.speciality_id', $request->speciality);
        }

        return Inertia::render('Students/Index', [
            "specialities" => Speciality::orderBy('name')->get(),
            "students" => StudentResource::collection($students->orderBy($fullNameQuery)->paginate(10)),
            "links" => $students->paginate(10)
        ]);
    }
}
