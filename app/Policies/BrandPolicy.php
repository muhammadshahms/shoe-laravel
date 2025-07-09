<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Brand;
use Illuminate\Auth\Access\Response;

class BrandPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny Brand')
            ? Response::allow()
            : Response::deny('You do not have permission to view brands.');
    }

    public function view(User $user, Brand $model) {
        return $user->hasPermissionTo('view Brand')
            ? Response::allow()
            : Response::deny('You do not have permission to view this brand.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create Brand')
            ? Response::allow()
            : Response::deny('You do not have permission to create a brand.');
    }

    public function update(User $user, Brand $model) {
        return $user->hasPermissionTo('update Brand')
            ? Response::allow()
            : Response::deny('You do not have permission to update this brand.');
    }

    public function delete(User $user, Brand $model) {
        return $user->hasPermissionTo('delete Brand')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this brand.');
    }

    public function restore(User $user, Brand $model) {
        return $user->hasPermissionTo('restore Brand')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this brand.');
    }

    public function forceDelete(User $user, Brand $model) {
        return $user->hasPermissionTo('forceDelete Brand')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this brand.');
    }
}

// ✅ Type **next** for the next model policy (CategoryPolicy.php) when ready.
