<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Order;
use Illuminate\Auth\Access\Response;

class OrderPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny Order')
            ? Response::allow()
            : Response::deny('You do not have permission to view orders.');
    }

    public function view(User $user, Order $model) {
        return $user->hasPermissionTo('view Order')
            ? Response::allow()
            : Response::deny('You do not have permission to view this order.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create Order')
            ? Response::allow()
            : Response::deny('You do not have permission to create an order.');
    }

    public function update(User $user, Order $model) {
        return $user->hasPermissionTo('update Order')
            ? Response::allow()
            : Response::deny('You do not have permission to update this order.');
    }

    public function delete(User $user, Order $model) {
        return $user->hasPermissionTo('delete Order')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this order.');
    }

    public function restore(User $user, Order $model) {
        return $user->hasPermissionTo('restore Order')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this order.');
    }

    public function forceDelete(User $user, Order $model) {
        return $user->hasPermissionTo('forceDelete Order')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this order.');
    }
}

// ✅ Type **next** for the next model policy (OrderItemPolicy.php) when ready.