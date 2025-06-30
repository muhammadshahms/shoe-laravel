<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Seed 5 root categories
        Category::factory(5)->create()->each(function ($parent) {
            // Seed 2-3 child categories per root
            Category::factory(rand(2,3))->create([
                'parent_id' => $parent->id,
            ]);
        });
    }
}
