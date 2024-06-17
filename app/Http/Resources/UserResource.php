<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $userName = $this->firstname . ' ' . $this->middlename . ' ' . $this->lastname;
        $userRole = '';
        switch ($this->role) {
            case User::STUDENT_ROLE:
                $userRole = 'Student';
                break;
            case User::PROFESSOR_ROLE:
                $userRole = 'Professor';
                break;
            case User::ADMIN_ROLE:
                $userRole = 'Admin';
                break;
        }
        return [
            'id' => $this->id,
            'username' => $this->username,
            'name' => $userName,
            'firstname' => $this->firstname,
            'middlename' => $this->middlename,
            'lastname' => $this->lastname,
            'role' => $userRole,
            'created' => date_create($this->created_at)->format('H:i M d, Y'),
            'updated' => date_create($this->updated_at)->format('H:i M d, Y')
        ];
    }
}
