<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Subject;

/** @mixin \App\Models\Grade */
class GradeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'grade' => $this->grade,
            'subject' => Subject::find($this->subject_id)->name,
            'date' => date_create($this->created_at)->format('H:i M d, Y'),
            'updated' => $this->created_at != $this->updated_at
                ? date_create($this->updated_at)->format('H:i M d, Y')
                : null
        ];
    }
}
