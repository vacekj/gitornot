<?php

namespace Database\Factories;

use App\Models\Repository;
use App\Models\Swipe;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Swipe>
 */
class SwipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'value' => Arr::random([-1, 1]),
            'user_id' => User::factory(),
            'repository_id' => Repository::factory()
        ];
    }
}
