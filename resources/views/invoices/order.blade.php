<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $order->order_number }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .header { margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; }
        .table th { background: #f4f4f4; }
    </style>
</head>
<body>
    <h2>Invoice</h2>
    <p><strong>Order Number:</strong> {{ $order->order_number }}</p>
    <p><strong>Date:</strong> {{ $order->created_at->format('d M Y') }}</p>

    <h3>Billing Details</h3>
    <p>
        {{ $order->billing_full_name }}<br>
        {{ $order->billing_address }}<br>
        {{ $order->billing_city }}, {{ $order->billing_country }}<br>
        {{ $order->billing_phone }}
    </p>

    <h3>Order Items</h3>
    <table class="table">
        <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
        @foreach ($order->cartItems as $item)
            <tr>
                <td>{{ $item->product->name }}</td>
                <td>{{ $item->quantity }}</td>
                <td>${{ number_format($item->price, 2) }}</td>
                <td>${{ number_format($item->price * $item->quantity, 2) }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <h3>Total: ${{ number_format($order->grand_total, 2) }}</h3>
</body>
</html>
