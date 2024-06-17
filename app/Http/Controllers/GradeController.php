<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Http\Resources\SubjectResource;
use App\Models\Grade;
use App\Http\Resources\GradeResource;
use App\Models\Professor;
use App\Models\Student;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        if (auth()->user()->role === User::STUDENT_ROLE)
        {
            $student = Student::where('user_id', auth()->user()->id)->firstOrFail();
            $grades = $student->grades;

            return Inertia::render('Grades/Index', [
                'grades' => GradeResource::collection($grades)
            ]);
        }
        return Redirect::route('subject.index');
    }

    public function show($subjectId, $studentId)
    {
        $grades = Grade::where('subject_id', $subjectId)
            ->where('student_id', $studentId)
            ->orderByDesc('created_at')
            ->get();
        $subject = Subject::findOrFail($subjectId);
        $student = Student::findOrFail($studentId);

        return Inertia::render('Grades/Show', [
            'grades' => GradeResource::collection($grades),
            'subject' => new SubjectResource($subject),
            'student' => new StudentResource($student),
        ]);
    }

    public function store(Request $request)
    {
        $professorId = Professor::where('user_id', auth()->user()->id)->first()->id;
        $student = new StudentResource(Student::findOrFail($request->student_id));
        $studentName = $student->toArray($request)['name'];

        Grade::create([
            'grade' => $request->grade,
            'subject_id' => $request->subject_id,
            'student_id' => $request->student_id,
            'professor_id' => $professorId,
        ]);

        return Redirect::route('subject.show', [
            'id' => $request->subject_id
        ])->with('message', "Graded $studentName successfully.");
    }

    public function edit($id)
    {
        $grade = Grade::findOrFail($id);

        return Inertia::render('Grades/Edit', [
            'grade' => new GradeResource($grade)
        ]);
    }

    public function update($id, Request $request)
    {
        $grade = Grade::findOrFail($id);
        $grade->update(['grade' => $request->grade]);

        return Redirect::route('grades.show', [
            'subject_id' => $grade->subject_id,
            'student_id' => $grade->student_id,
        ])->with('message', 'Successfully edited grade.');
    }

    public function destroy($id)
    {
        $grade = Grade::findOrFail($id);
        $grade->delete();

        return Redirect::back()->with('message', 'Successfully deleted grade.');
    }
}
