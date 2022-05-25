<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Repository>
 */
class RepositoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'stars' => $this->faker->numberBetween(0, 1000000),
            'forks' => $this->faker->numberBetween(0, 100),
            'description' => $this->faker->sentence(),
            'languages' => json_encode(["PHP" => 100, "C" => 200]),
            'user_id' => User::factory()
        ];
    }
}
