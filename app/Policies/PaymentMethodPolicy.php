<?php

namespace App\Policies;

use App\Models\User;
use App\Models\PaymentMethod;
use Illuminate\Auth\Access\Response;

class PaymentMethodPolicy
{
    public function viewAny(User $user) {
        return $user->hasPermissionTo('viewAny PaymentMethod')
            ? Response::allow()
            : Response::deny('You do not have permission to view payment methods.');
    }

    public function view(User $user, PaymentMethod $model) {
        return $user->hasPermissionTo('view PaymentMethod')
            ? Response::allow()
            : Response::deny('You do not have permission to view this payment method.');
    }

    public function create(User $user) {
        return $user->hasPermissionTo('create PaymentMethod')
            ? Response::allow()
            : Response::deny('You do not have permission to create a payment method.');
    }

    public function update(User $user, PaymentMethod $model) {
        return $user->hasPermissionTo('update PaymentMethod')
            ? Response::allow()
            : Response::deny('You do not have permission to update this payment method.');
    }

    public function delete(User $user, PaymentMethod $model) {
        return $user->hasPermissionTo('delete PaymentMethod')
            ? Response::allow()
            : Response::deny('You do not have permission to delete this payment method.');
    }

    public function restore(User $user, PaymentMethod $model) {
        return $user->hasPermissionTo('restore PaymentMethod')
            ? Response::allow()
            : Response::deny('You do not have permission to restore this payment method.');
    }

    public function forceDelete(User $user, PaymentMethod $model) {
        return $user->hasPermissionTo('forceDelete PaymentMethod')
            ? Response::allow()
            : Response::deny('You do not have permission to permanently delete this payment method.');
    }
}

// ✅ Type **next** for the next model policy (ProductPolicy.php) when ready.