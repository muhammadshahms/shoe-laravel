<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Brand;
class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Brand::insert([
            ['name' => 'Apple', 'slug' => 'apple', 'is_active' => true],
            ['name' => 'Samsung', 'slug' => 'samsung', 'is_active' => true],
            ['name' => 'Sony', 'slug' => 'sony', 'is_active' => true],
        ]);
    }
}
