<?php

namespace App\Http\Resources;

use App\Models\Professor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Subject */
class SubjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $professorUser = User::find(
            Professor::find($this->professor_id)->user_id
        );
        $professorName = $professorUser->firstname . ' ' . $professorUser->lastname;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'professor' => $professorName,
            'created_at' => date_create($this->created_at)->format('H:i M d, Y'),
        ];
    }
}
