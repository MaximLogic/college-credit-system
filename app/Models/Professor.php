<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{

    protected $table = 'professors';

    protected $fillable = ['user_id'];
    public function subjects()
    {
        return $this->hasMany(Subject::class, 'professor_id');
    }
}
