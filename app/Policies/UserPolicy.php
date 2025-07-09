<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny User')
            ? Response::allow()
            : Response::deny('You do not have permission to view users.');
    }

    public function view(User $user, User $model) {
        return $user->hasPermissionTo('view User')
            ? Response::allow()
            : Response::deny('You do not have permission to view this user.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create User')
            ? Response::allow()
            : Response::deny('You do not have permission to create a user.');
    }

    public function update(User $user, User $model) {
        return $user->hasPermissionTo('update User')
            ? Response::allow()
            : Response::deny('You do not have permission to update this user.');
    }

    public function delete(User $user, User $model) {
        return $user->hasPermissionTo('delete User')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this user.');
    }

    public function restore(User $user, User $model) {
        return $user->hasPermissionTo('restore User')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this user.');
    }

    public function forceDelete(User $user, User $model) {
        return $user->hasPermissionTo('forceDelete User')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this user.');
    }
}

// ✅ Type **next** for the next model policy (WishlistPolicy.php) when ready.