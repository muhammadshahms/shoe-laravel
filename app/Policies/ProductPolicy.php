<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Product;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny Product')
            ? Response::allow()
            : Response::deny('You do not have permission to view products.');
    }

    public function view(User $user, Product $model) {
        return $user->hasPermissionTo('view Product')
            ? Response::allow()
            : Response::deny('You do not have permission to view this product.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create Product')
            ? Response::allow()
            : Response::deny('You do not have permission to create a product.');
    }

    public function update(User $user, Product $model) {
        return $user->hasPermissionTo('update Product')
            ? Response::allow()
            : Response::deny('You do not have permission to update this product.');
    }

    public function delete(User $user, Product $model) {
        return $user->hasPermissionTo('delete Product')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this product.');
    }

    public function restore(User $user, Product $model) {
        return $user->hasPermissionTo('restore Product')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this product.');
    }

    public function forceDelete(User $user, Product $model) {
        return $user->hasPermissionTo('forceDelete Product')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this product.');
    }
}

// ✅ Type **next** for the next model policy (ProductAttributePolicy.php) when ready.
