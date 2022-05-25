<?php

use App\Models\User;
use Github\AuthMethod;
use GrahamCampbell\GitHub\Facades\GitHub;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    $featured_repo = app('github')->repo()->show('foundry-rs', 'foundry');

    return Inertia::render('Welcome', [
        'repos' =>[$featured_repo]
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    app('github')->authenticate($user->github_token, null, AuthMethod::ACCESS_TOKEN);



    $repos = app('github')->me()->repositories();
    return Inertia::render('Dashboard', ['repos' => $repos]);
})->middleware(['auth'])->name('dashboard');

Route::get('/auth/redirect', function () {
    return Socialite::driver('github')->redirect();
});

Route::get('/auth/callback', function () {
    $githubUser = Socialite::driver('github')->user();

    Log::debug($githubUser->token);
    $token = $githubUser->token;

    $user = User::updateOrCreate([
        'github_id' => $githubUser->id,
    ], [
        'name' => $githubUser->name,
        'email' => $githubUser->email,
        'github_token' => $token,
    ]);

    Auth::login($user);

    return redirect('/dashboard');
});

require __DIR__.'/auth.php';
