<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updateStatus(Request $request)
    {
        $request->user()->fill($request->only('active_status'))->save();

        return [
            'data' => $request->user()
        ];
    }
}
