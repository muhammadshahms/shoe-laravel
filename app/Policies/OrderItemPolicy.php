<?php

namespace App\Policies;

use App\Models\User;
use App\Models\OrderItem;
use Illuminate\Auth\Access\Response;

class OrderItemPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny OrderItem')
            ? Response::allow()
            : Response::deny('You do not have permission to view order items.');
    }

    public function view(User $user, OrderItem $model) {
        return $user->hasPermissionTo('view OrderItem')
            ? Response::allow()
            : Response::deny('You do not have permission to view this order item.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create OrderItem')
            ? Response::allow()
            : Response::deny('You do not have permission to create an order item.');
    }

    public function update(User $user, OrderItem $model) {
        return $user->hasPermissionTo('update OrderItem')
            ? Response::allow()
            : Response::deny('You do not have permission to update this order item.');
    }

    public function delete(User $user, OrderItem $model) {
        return $user->hasPermissionTo('delete OrderItem')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this order item.');
    }

    public function restore(User $user, OrderItem $model) {
        return $user->hasPermissionTo('restore OrderItem')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this order item.');
    }

    public function forceDelete(User $user, OrderItem $model) {
        return $user->hasPermissionTo('forceDelete OrderItem')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this order item.');
    }
}

// ✅ Type **next** for the next model policy (PaymentMethodPolicy.php) when ready.
