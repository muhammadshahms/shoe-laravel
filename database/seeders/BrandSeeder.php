<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        // Seed 10 brands with logo images
        Brand::factory(10)->create();
    }
}
