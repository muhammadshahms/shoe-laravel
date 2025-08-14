<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [];

        // Get all models from app/Models
        $models = File::allFiles(app_path('Models'));

        foreach ($models as $model) {
            $modelName = $model->getBasename('.php');

            // Define CRUD permissions for each model
            $permissions[] = ['name' => 'viewAny ' . $modelName, 'guard_name' => 'web'];
            $permissions[] = ['name' => 'view ' . $modelName, 'guard_name' => 'web'];
            $permissions[] = ['name' => 'create ' . $modelName, 'guard_name' => 'web'];
            $permissions[] = ['name' => 'update ' . $modelName, 'guard_name' => 'web'];
            $permissions[] = ['name' => 'delete ' . $modelName, 'guard_name' => 'web'];
        }

        // Create or update permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate($permission);
        }

        // Create superadmin role if not exists
        $adminRole = Role::firstOrCreate(['name' => 'admin']);

        // Assign all permissions to superadmin
        $adminRole->syncPermissions(Permission::all());
    }
}
