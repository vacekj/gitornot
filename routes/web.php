<?php

use App\Http\Controllers\SwipeController;
use App\Models\Repository;
use App\Models\Swipe;
use App\Models\User;
use Github\AuthMethod;
use GrahamCampbell\GitHub\Facades\GitHub;
use Illuminate\Database\Query\Builder;
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
        'repos' => [$featured_repo]
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $repos = Repository::whereUserId($user->id)->get();

    return Inertia::render('Dashboard', ['repos' => $repos]);
})->middleware(['auth'])->name('dashboard');

Route::get('/leaderboard', function () {
    $repos = Repository::all();
    $best = $repos->map(function (Repository $repo) {
        return [
            'repo' => $repo,
            'score' => $repo->swipes()->map(fn($s) => $s->value)->sum(),
            'owner' => User::whereId($repo->user_id)->first()
        ];
    })->sortBy('score');

    return Inertia::render('Leaderboard', ['repos' => $best]);
})->middleware(['auth'])->name('leaderboard');

/* Swiping page */
Route::get('/swipe', function (Request $req) {
    $user = Auth::user();
    /* Filter out repositories of the user*/
    $repos = Repository::where('user_id', '!=', $user->id)
        ->whereNotExists(function (Builder $query) {
            $query->select(DB::raw("*"))
                ->from('swipes')
                ->where('swipes.repository_id', '==', 'repository.id')
                ->where('swipes.user_id', '==', 'repository.id');
        })->get();

    return Inertia::render('Swipe', ['repos' => $repos]);
})->middleware(['auth'])->name('swipe');

/* Perform a swipe */
Route::post('/swipe', function (Request $req) {

    $swipe = $req->validate([
        'user_id' => 'required|integer|exists:users',
        'repository_id' => 'required|integer|exists:repositories',
        'value' => "required|in:-1,1"
    ]);

    if ($req->user()->id !== $swipe->user_id) {
        abort(403);
    }

    return Swipe::firstOrCreate($swipe);
})->middleware(['auth'])->name('swipe');;


/* (Re)load user repositories into database */
Route::post('/refresh_repos', function (Request $req) {
    $user = Auth::user();
    app('github')->authenticate($user->github_token, null, AuthMethod::ACCESS_TOKEN);

    $repos = app('github')->me()->repositories();

    $mappedRepos = collect($repos)->map(function ($repo) use ($user) {
        return [
            'id' => $repo['id'],
            'name' => $repo['name'],
            'user_id' => $user->id,
            'stars' => $repo['stargazers_count'],
            'forks' => $repo['forks'],
            'description' => $repo['description'],
            'url' => $repo['html_url'],
        ];
    })->toArray();

    Repository::upsert($mappedRepos, ['id']);

    return redirect('/dashboard');
})->middleware(['auth']);

/* GitHub Authentication routes */
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
