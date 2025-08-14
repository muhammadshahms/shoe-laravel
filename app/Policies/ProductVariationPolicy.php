<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ProductVariation;
use Illuminate\Auth\Access\Response;

class ProductVariationPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny ProductVariation')
            ? Response::allow()
            : Response::deny('You do not have permission to view product variations.');
    }

    public function view(User $user, ProductVariation $model) {
        return $user->hasPermissionTo('view ProductVariation')
            ? Response::allow()
            : Response::deny('You do not have permission to view this product variation.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create ProductVariation')
            ? Response::allow()
            : Response::deny('You do not have permission to create a product variation.');
    }

    public function update(User $user, ProductVariation $model) {
        return $user->hasPermissionTo('update ProductVariation')
            ? Response::allow()
            : Response::deny('You do not have permission to update this product variation.');
    }

    public function delete(User $user, ProductVariation $model) {
        return $user->hasPermissionTo('delete ProductVariation')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this product variation.');
    }

    public function restore(User $user, ProductVariation $model) {
        return $user->hasPermissionTo('restore ProductVariation')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this product variation.');
    }

    public function forceDelete(User $user, ProductVariation $model) {
        return $user->hasPermissionTo('forceDelete ProductVariation')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this product variation.');
    }
}

// ✅ Type **next** for the next model policy (ProductReviewPolicy.php) when ready.
