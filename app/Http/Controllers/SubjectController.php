<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Http\Resources\SubjectResource;
use App\Models\Grade;
use App\Models\Professor;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = [];
        if (auth()->user()->role === User::STUDENT_ROLE) {
            $subjects = Student::where('user_id', auth()->user()->id)
                ->firstOrFail()
                ->subjects;
        } else if (auth()->user()->role === User::PROFESSOR_ROLE) {
            $subjects = Professor::where('user_id', auth()->user()->id)
                ->firstOrFail()
                ->subjects;
        }
        else {
            $subjects = Subject::all();
        }

        if ($subjects->isEmpty()) {
            return Inertia::render('Subjects/Index', [
                "subjects" => null,
                "links" => null
            ]);
        }

        return Inertia::render('Subjects/Index', [
            "subjects" => SubjectResource::collection($subjects->toQuery()->paginate(10)),
            "links" => $subjects->toQuery()->paginate(10)
        ]);
    }

    public function show($id)
    {
        $subject = Subject::findOrFail($id);
        $subjectStudents = $subject->students;

        if ($subjectStudents->isEmpty()) {
            $students = collect();
            $paginationLinks = [
                'data' => [],
                'current_page' => 1,
                'last_page' => 1,
                'per_page' => 10,
                'total' => 0,
                'links' => [],
            ];
        } else {
            $students = $subjectStudents->toQuery()->paginate(10);
            $paginationLinks = $students;
        }

        return Inertia::render('Subjects/Show', [
            "subject" => new SubjectResource($subject),
            "students" => StudentResource::collection($students),
            "links" => $paginationLinks
        ]);
    }

    public function create()
    {
        return Inertia::render('Subjects/Create');
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        Subject::create([
            "name" => $request->name,
            "professor_id" => Professor::where('user_id', $user->id)->firstOrFail()->id,
        ]);

        return Redirect::route('subject.index')->with('message', 'Subject created successfully.');
    }

    public function edit($id)
    {
        $subject = Subject::findOrFail($id);

        return Inertia::render('Subjects/Edit', [
            "subject" => new SubjectResource($subject)
        ]);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);

        $subject->fill($request->toArray())->save();

        return Redirect::route('subject.index')->with('message', 'Subject updated successfully.');
    }

    public function destroy($id)
    {
        $subject = Subject::findOrFail($id);

        $subject->delete();

        return Redirect::route('subject.index')->with('message', 'Successfully deleted subject ' . $subject->name . '.');
    }

    public function nonRegisteredStudents(Request $request, $id)
    {
        $subject = Subject::findOrFail($id);
        $fullNameQuery = DB::raw("CONCAT(users.firstname, ' ', users.middlename, ' ', users.lastname)");

        $subjectStudents = DB::table('student_subject')
            ->where('subject_id', $subject->id)
            ->pluck('student_id');

        $availableStudentIds = DB::table('students')
            ->whereNotIn('id', $subjectStudents)
            ->pluck('id');

        $availableStudents = Student::join('users', 'students.user_id', '=', 'users.id')
            ->select(['students.*',])
            ->whereIn('students.id', $availableStudentIds)
            ->where($fullNameQuery, 'like', "%$request->search%");

        if (isset($request->speciality)) {
            $availableStudents->where('students.speciality_id', $request->speciality);
        }

        return Inertia::render('Subjects/Students', [
            "subject" => new SubjectResource($subject),
            "specialities" => Speciality::orderBy('name')->get(),
            "students" => StudentResource::collection($availableStudents->orderBy($fullNameQuery)->paginate(10)),
            "links" => $availableStudents->paginate(10)
        ]);
    }

    public function assignStudent(Request $request, $subjectId)
    {
        $studentId = $request->studentId;
        DB::table('student_subject')
            ->insert([
                'subject_id' => $subjectId,
                'student_id' => $studentId
            ]);

        return Redirect::route('subject.show', ['id' => $subjectId])->with('message', 'Successfully assigned student to subject.');
    }

    public function grade($subjectId, $studentId)
    {
        $subject = Subject::findOrFail($subjectId);
        $student = Student::findOrFail($studentId);

        return Inertia::render('Subjects/Grade', [
            "subject" => new SubjectResource($subject),
            "student" => new StudentResource($student),
        ]);
    }

    public function suspendStudent(Request $request, $subjectId)
    {
        $studentId = $request->studentId;
        DB::table('student_subject')
            ->where('subject_id', $subjectId)
            ->where('student_id', $studentId)
            ->delete();
        Grade::where('subject_id', $subjectId)
            ->where('student_id', $studentId)
            ->delete();

        return Redirect::route('subject.show', ['id' => $subjectId])->with('message', 'Successfully suspended student from subject.');
    }
}
