<?php

namespace Database\Seeders;

use App\Models\Repository;
use App\Models\Swipe;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $users = User::factory()->has(Repository::factory()->count(5))->count(30)->create();
        $repos = Repository::all();

        /** @var User $user */
        foreach ($users as $user) {
            /** @var Repository $randomRepo */
            $randomRepo = $repos->random(1)->first();
            Swipe::factory()->count(50)->create([
                'repository_id' => $randomRepo->id,
                'user_id' => $user->id
            ]);
        }
    }
}
