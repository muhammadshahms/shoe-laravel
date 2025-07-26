<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Brand;

/**
 * @extends Factory<Brand>
 */
class BrandFactory extends Factory
{
    protected $model = Brand::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->company;

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence,
            'website' => $this->faker->url,
            'position' => $this->faker->numberBetween(1, 100),
            'is_active' => $this->faker->boolean(90),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Brand $brand) {
            // Seed logo image from placeholder
            $brand->addMediaFromUrl('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-40yXQw66Xo-dHiOiSF0Eq2eSVJ1-8pH6-w&s')
                ->toMediaCollection('logo');
        });
    }
}
