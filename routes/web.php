<?php

use App\Http\Controllers\GradeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\ProfessorMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::patch('/profile/updateUserInfo', [ProfileController::class, 'updateUserInfo'])->name('profile.updateUserInfo');
    Route::patch('/profile/updateSpeciality', [ProfileController::class, 'updateSpeciality'])->name('profile.updateSpeciality');

    Route::get('/grades', [GradeController::class, 'index'])->name('grades.index');

    Route::get('/subjects', [SubjectController::class, 'index'])->name('subject.index');
});

Route::middleware(['auth'])->group(function () {
    Route::middleware([ProfessorMiddleware::class])->group(function () {
        Route::get('/students', [StudentController::class, 'index'])->name('student.index');

        Route::get('/subjects/{id}', [SubjectController::class, 'show'])->name('subject.show')->whereNumber('id');
        Route::get('/subjects/create', [SubjectController::class, 'create'])->name('subject.create');

        Route::get('/subjects/{id}/edit', [SubjectController::class, 'edit'])->name('subject.edit')->whereNumber('id');
        Route::patch('/subjects/{id}', [SubjectController::class, 'update'])->name('subject.update')->whereNumber('id');
        Route::delete('/subjects/{id}', [SubjectController::class, 'destroy'])->name('subject.destroy')->whereNumber('id');

        Route::get('/subjects/{id}/nonRegisteredStudents', [SubjectController::class, 'nonRegisteredStudents'])->name('subject.nonRegisteredStudents')->whereNumber('id');
        Route::post('/subjects/{id}/addStudent', [SubjectController::class, 'assignStudent'])
            ->name('subject.assignStudent')
            ->whereNumber(['id']);
        Route::delete('/subjects/{id}/suspendStudent', [SubjectController::class, 'suspendStudent'])
            ->name('subject.suspendStudent')
            ->whereNumber(['id']);

        Route::get('/subjects/{subject_id}/students/{student_id}/grade', [SubjectController::class, 'grade'])
            ->name('subject.grade')
            ->whereNumber(['subject_id', 'student_id']);

        Route::get('/grades/{subject_id}/students/{student_id}', [GradeController::class, 'show'])->name('grades.show')
            ->whereNumber(['subject_id', 'student_id']);
        Route::post('/grades', [GradeController::class, 'store'])->name('grades.store');
        Route::get('/grades/{id}', [GradeController::class, 'edit'])->name('grades.edit')->whereNumber('id');
        Route::patch('/grades/{id}', [GradeController::class, 'update'])->name('grades.update')->whereNumber('id');
        Route::delete('/grades/{id}', [GradeController::class, 'destroy'])->name('grades.destroy')->whereNumber('id');

        Route::post('/subjects', [SubjectController::class, 'store'])->name('subject.store');
    });

    Route::middleware(AdminMiddleware::class)->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit')->whereNumber('id');
        Route::patch('/users/{id}', [UserController::class, 'update'])->name('users.update')->whereNumber('id');
        Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy')->whereNumber('id');

        Route::get('/specialities', [SpecialityController::class, 'index'])->name('specialities.index');
        Route::get('/specialities/create', [SpecialityController::class, 'create'])->name('specialities.create');
        Route::post('/specialities', [SpecialityController::class, 'store'])->name('specialities.store');
        Route::get('/specialities/{id}/edit', [SpecialityController::class, 'edit'])->name('specialities.edit')->whereNumber('id');
        Route::patch('/specialities/{id}', [SpecialityController::class, 'update'])->name('specialities.update')->whereNumber('id');
        Route::delete('/specialities/{id}', [SpecialityController::class, 'destroy'])->name('specialities.destroy')->whereNumber('id');
    });
});

require __DIR__.'/auth.php';
