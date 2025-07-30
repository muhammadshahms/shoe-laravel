<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Http\Request;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
    public function checkout()
    {
        DB::beginTransaction();

        try {
            $user = Auth::user();
            /** @var \App\Models\User $user */
            
            $cartItems = $user->cartItems()->with('product')->get();
            if ($cartItems->isEmpty()) {
                return back()->withErrors(['error' => 'Your cart is empty.']);
            }
            // Check the product quantities
            foreach ($cartItems as $item) {
                if ($item->product->quantity < $item->qty) {
                    throw new \Exception("Product {$item->product->name} is out of stock.");
                }
            }

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'status' => 'pending',
                'total' => $cartItems->sum(fn($item) => $item->product->price * $item->qty),
            ]);

            // Attach products to order with pivot data
            foreach ($cartItems as $item) {
                $order->products()->attach($item->product_id, [
                    'quantity' => $item->qty,
                    'price' => $item->product->price,
                ]);

                // Decrease product stock
                $item->product->decrement('quantity', $item->qty);
            }

            // Empty the user's cart
            $user->cartItems()->delete();

            DB::commit();

            return redirect()->route('orders.show', $order->id)
                ->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
