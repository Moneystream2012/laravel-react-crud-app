<?php

namespace App\Http\Controllers;

use App\Models\Advert;
use Illuminate\Http\Request;

class AdvertController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Advert::paginate(3)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string',
            'description' => 'required|string',
            'url'         => 'required|string'
        ]);

        try {
            Advert::create($request->post());

            return response()->json([
                'message' => 'Advertise Created Successfully!!'
            ]);
        }
        catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while creating a advertise!!'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Advert $advert)
    {
        return response()->json($advert);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Advert $advert)
    {
        $request->validate([
            'title'       => 'required|string',
            'description' => 'required|string',
            'url'         => 'required|string'
        ]);

        try {

            $advert->fill($request->post())->update();

            return response()->json([
                'message' => 'Advertise Updated Successfully!!'
            ]);

        }
        catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a advertise!!'
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Advert $advert)
    {
        try {

            $advert->delete();

            return response()->json([
                'message' => 'Advertise Deleted Successfully!!'
            ]);

        }
        catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a advertise!!'
            ]);
        }
    }
}