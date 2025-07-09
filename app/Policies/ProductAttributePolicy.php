<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ProductAttribute;
use Illuminate\Auth\Access\Response;

class ProductAttributePolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny ProductAttribute')
            ? Response::allow()
            : Response::deny('You do not have permission to view product attributes.');
    }

    public function view(User $user, ProductAttribute $model) {
        return $user->hasPermissionTo('view ProductAttribute')
            ? Response::allow()
            : Response::deny('You do not have permission to view this product attribute.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create ProductAttribute')
            ? Response::allow()
            : Response::deny('You do not have permission to create a product attribute.');
    }

    public function update(User $user, ProductAttribute $model) {
        return $user->hasPermissionTo('update ProductAttribute')
            ? Response::allow()
            : Response::deny('You do not have permission to update this product attribute.');
    }

    public function delete(User $user, ProductAttribute $model) {
        return $user->hasPermissionTo('delete ProductAttribute')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this product attribute.');
    }

    public function restore(User $user, ProductAttribute $model) {
        return $user->hasPermissionTo('restore ProductAttribute')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this product attribute.');
    }

    public function forceDelete(User $user, ProductAttribute $model) {
        return $user->hasPermissionTo('forceDelete ProductAttribute')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this product attribute.');
    }
}

// ✅ Type **next** for the next model policy (ProductReviewPolicy.php) when ready.
