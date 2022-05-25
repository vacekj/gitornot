<?php

namespace Database\Seeders;

use App\Models\Swipe;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SwipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Swipe::factory()->count(100)->for(User::factory())->create();
    }
}
