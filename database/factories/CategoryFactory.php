<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Category;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(2, true) . ' Shoes';

        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->sentence,
            'parent_id' => null, // For root categories; adjust in seeder for subcategories
            'position' => $this->faker->numberBetween(1, 50),
            'is_active' => $this->faker->boolean(90),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Category $category) {
            // Seed banner image from placeholder
            $category->addMediaFromUrl('https://loremflickr.com/640/480/category')
                ->toMediaCollection('banner');
        });
    }
}
