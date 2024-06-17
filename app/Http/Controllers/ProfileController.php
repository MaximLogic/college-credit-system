<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Speciality;
use App\Models\Student;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $speciality = null;

        if (auth()->user()->role === 0)
        {
            $userStudent = Student::where('user_id', auth()->user()->id)->first();
            $speciality = Speciality::find($userStudent->speciality_id);
        }
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'speciality' => $speciality,
            'specialities' => Speciality::all(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('message', 'Successfully updated user information.');
    }

    public function updateUserInfo(Request $request): RedirectResponse
    {
        $request->user()->fill($request->toArray());
        $request->user()->save();

        return Redirect::route('profile.edit')->with('message', 'Successfully updated user data.');
    }

    public function updateSpeciality(Request $request): RedirectResponse
    {
        Student::where('user_id', auth()->user()->id)->update(['speciality_id' => $request->speciality_id]);

        return Redirect::route('profile.edit')->with('message', 'Successfully updated speciality.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
