<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecialityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => date_create($this->created_at)->format('H:i M d, Y'),
            'updated_at' => date_create($this->updated_at)->format('H:i M d, Y')
        ];
    }
}
