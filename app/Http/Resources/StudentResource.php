<?php

namespace App\Http\Resources;

use App\Models\Speciality;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Student */
class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $studentUser = User::find($this->user_id);
        $studentName =
            $studentUser->firstname . ' ' .
            $studentUser->middlename . ' ' .
            $studentUser->lastname;

        return [
            'id' => $this->id,
            'name' => $studentName,
            'speciality' => Speciality::find($this->speciality_id)->name ?? null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
