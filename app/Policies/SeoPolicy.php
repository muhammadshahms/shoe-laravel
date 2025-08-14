<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Seo;
use Illuminate\Auth\Access\Response;

class SeoPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny Seo')
            ? Response::allow()
            : Response::deny('You do not have permission to view seo records.');
    }

    public function view(User $user, Seo $model) {
        return $user->hasPermissionTo('view Seo')
            ? Response::allow()
            : Response::deny('You do not have permission to view this seo record.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create Seo')
            ? Response::allow()
            : Response::deny('You do not have permission to create a seo record.');
    }

    public function update(User $user, Seo $model) {
        return $user->hasPermissionTo('update Seo')
            ? Response::allow()
            : Response::deny('You do not have permission to update this seo record.');
    }

    public function delete(User $user, Seo $model) {
        return $user->hasPermissionTo('delete Seo')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this seo record.');
    }

    public function restore(User $user, Seo $model) {
        return $user->hasPermissionTo('restore Seo')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this seo record.');
    }

    public function forceDelete(User $user, Seo $model) {
        return $user->hasPermissionTo('forceDelete Seo')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this seo record.');
    }
}

// ✅ Type **next** for the next model policy (ShipmentPolicy.php) when ready.
