<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Category;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny Category')
            ? Response::allow()
            : Response::deny('You do not have permission to view categories.');
    }

    public function view(User $user, Category $model) {
        return $user->hasPermissionTo('view Category')
            ? Response::allow()
            : Response::deny('You do not have permission to view this category.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create Category')
            ? Response::allow()
            : Response::deny('You do not have permission to create a category.');
    }

    public function update(User $user, Category $model) {
        return $user->hasPermissionTo('update Category')
            ? Response::allow()
            : Response::deny('You do not have permission to update this category.');
    }

    public function delete(User $user, Category $model) {
        return $user->hasPermissionTo('delete Category')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this category.');
    }

    public function restore(User $user, Category $model) {
        return $user->hasPermissionTo('restore Category')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this category.');
    }

    public function forceDelete(User $user, Category $model) {
        return $user->hasPermissionTo('forceDelete Category')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this category.');
    }
}

// ✅ Type **next** for the next model policy (OrderPolicy.php) when ready.
