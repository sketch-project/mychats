<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canResetPassword' => Route::has('password.request'),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/chats', [ChatController::class, 'index'])->name('chats.index');
    Route::get('/contacts', [ChatController::class, 'index'])->name('contacts.index');
    Route::get('/archived-chats', [ChatController::class, 'index'])->name('archived-chats.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
