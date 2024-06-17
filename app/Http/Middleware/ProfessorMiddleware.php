<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class ProfessorMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if($request->user()->role === User::STUDENT_ROLE)
        {
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}
