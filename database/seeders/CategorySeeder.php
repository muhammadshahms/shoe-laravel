<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Create Parent Categories
        $electronics = Category::create([
            'name' => 'Electronics',
            'description' => 'Electronic items and gadgets',
            'position' => 1,
            'is_active' => true,
        ]);

        $fashion = Category::create([
            'name' => 'Fashion',
            'description' => 'Clothing and accessories',
            'position' => 2,
            'is_active' => true,
        ]);

        // Create Child Categories for Electronics
        Category::create([
            'name' => 'Mobiles',
            'description' => 'Smartphones and accessories',
            'parent_id' => $electronics->id,
            'position' => 1,
            'is_active' => true,
        ]);

        Category::create([
            'name' => 'Laptops',
            'description' => 'Laptops and accessories',
            'parent_id' => $electronics->id,
            'position' => 2,
            'is_active' => true,
        ]);

        // Create Child Categories for Fashion
        Category::create([
            'name' => 'Men\'s Clothing',
            'description' => 'Clothes for men',
            'parent_id' => $fashion->id,
            'position' => 1,
            'is_active' => true,
        ]);

        Category::create([
            'name' => 'Women\'s Clothing',
            'description' => 'Clothes for women',
            'parent_id' => $fashion->id,
            'position' => 2,
            'is_active' => true,
        ]);
    }
}
