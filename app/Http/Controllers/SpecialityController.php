<?php

namespace App\Http\Controllers;

use App\Http\Resources\SpecialityResource;
use App\Models\Speciality;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SpecialityController extends Controller
{
    public function index()
    {
        return Inertia::render('Specialities/Index', [
            'specialities' => SpecialityResource::collection(Speciality::paginate(10)),
            'links' => Speciality::paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Specialities/Create');
    }

    public function store(Request $request)
    {
        Speciality::create(['name' => $request->name]);

        return Redirect::route('specialities.index')->with('message', 'Speciality created successfully.');
    }

    public function edit($id)
    {
        Speciality::findOrFail($id);

        return Inertia::render('Specialities/Edit', [
            'speciality' => new SpecialityResource(Speciality::findOrFail($id))
        ]);
    }

    public function update(Request $request, $id)
    {
        $subject = Speciality::findOrFail($id);

        $subject->fill($request->toArray())->save();

        return Redirect::route('specialities.index')->with('message', 'Speciality updated successfully.');
    }

    public function destroy($id)
    {
        Student::where('speciality_id', $id)->update(['speciality_id' => null]);
        Speciality::findOrFail($id)->delete();

        return Redirect::back()->with('message', 'Speciality deleted successfully.');
    }
}
