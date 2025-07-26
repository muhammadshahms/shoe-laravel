<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ✅ Create roles (idempotent)
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'user']);

        // ✅ Create or update Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'), // 🔐 Change this in production
            ]
        );

        // Assign 'admin' role (idempotent)
        $admin->syncRoles('admin');

        // ✅ Create or update Normal User
        $user = User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        // Assign 'user' role (idempotent)
        $user->syncRoles('user');
    }
}
