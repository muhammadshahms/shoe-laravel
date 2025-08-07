<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
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
        $order->load(['cartItems.product']);


        // dd($order);

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
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

    public function checkout(Request $request)
    {
        DB::beginTransaction();

        try {
            $user = Auth::user();

            $validated = $request->validate([
                // Shipping
                'shipping_full_name' => 'required|string|max:255',
                'shipping_address' => 'required|string',
                'shipping_city' => 'required|string',
                'shipping_state' => 'nullable|string',
                'shipping_zip_code' => 'nullable|string',
                'shipping_country' => 'required|string',
                'shipping_phone' => 'required|string|max:20',

                // Billing
                'billing_full_name' => 'required|string|max:255',
                'billing_email' => 'required|email|max:255',
                'billing_address' => 'required|string',
                'billing_city' => 'required|string',
                'billing_state' => 'nullable|string',
                'billing_zip_code' => 'nullable|string',
                'billing_country' => 'required|string',
                'billing_phone' => 'required|string|max:20',

                // Payment
                'payment_method' => 'required|in:cod',
                'payment_status' => 'required|in:unpaid,paid',
                'notes' => 'nullable|string',
            ]);

            $cartItems = $request->input('cartItems', []);

            if (empty($cartItems)) {
                return back()->withErrors(['error' => 'Your cart is empty.']);
            }

            $total = 0;
            $lockedProducts = [];

            // Validate stock & lock products
            foreach ($cartItems as $item) {
                $product = Product::lockForUpdate()->find($item['id']);

                if (!$product) {
                    throw new \Exception("Product not found (ID: {$item['id']})");
                }

                if ($product->quantity < $item['quantity']) {
                    throw new \Exception("Product {$product->name} is out of stock.");
                }

                $lockedProducts[$product->id] = $product;
                $total += $product->price * $item['quantity'];
            }

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'status' => Order::STATUS_PENDING,
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),
                'grand_total' => $total,
                'item_count' => collect($cartItems)->sum('quantity'),
                'payment_method' => $validated['payment_method'],
                'payment_status' => $validated['payment_status'],

                // Shipping
                'shipping_full_name' => $validated['shipping_full_name'],
                'shipping_address' => $validated['shipping_address'],
                'shipping_city' => $validated['shipping_city'],
                'shipping_state' => $validated['shipping_state'],
                'shipping_zip_code' => $validated['shipping_zip_code'],
                'shipping_country' => $validated['shipping_country'],
                'shipping_phone' => $validated['shipping_phone'],

                // Billing
                'billing_full_name' => $validated['billing_full_name'],
                'billing_email' => $validated['billing_email'],
                'billing_address' => $validated['billing_address'],
                'billing_city' => $validated['billing_city'],
                'billing_state' => $validated['billing_state'],
                'billing_zip_code' => $validated['billing_zip_code'],
                'billing_country' => $validated['billing_country'],
                'billing_phone' => $validated['billing_phone'],

                'notes' => $validated['notes'] ?? null,
            ]);
            // Attach cart items to the order
            foreach ($cartItems as $item) {
                $product = $lockedProducts[$item['id']];

                $cart = CartItem::create([
                    'order_id' => $order->id,
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);
                // dd($cart);
                // Reduce stock
                $product->decrement('quantity', $item['quantity']);
            }

            DB::commit();
            return redirect()->route('orders.show', $order->id)
                ->with('success', 'Order placed successfully!');


        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

}
