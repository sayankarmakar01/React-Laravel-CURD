<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\insert;



class InsertController extends Controller
{
    public function index(Request $request)
    {   $request->all();
        if ($request->typ=="ser") {
            if ($request->find!="") {
                $insert = insert::where('mob', $request->find)->get();
            }
            else if ($request->id!="") {
                $insert = insert::where('id', $request->id)->get();
            }
            return response()->json([
            'status'=>'200',
            'data'=>$insert
            ]);
        }
        else {
            $model = new insert();
            return response()->json([
            'status'=>'200',
            'data'=>$model::all()
            ]);
        } 
    }

    public function delete(Request $request){
        $request->all();
        $insert = insert::find($request->id);
        if (!$insert) {
            return response()->json([
                'message' => 'User not found'], 404
            );
        }
        else {
            if ($insert->image && file_exists(public_path('uploads/'.$insert->image))) {
                unlink(public_path('uploads/'.$insert->image));
            }
            $insert->delete();
            return response()->json([
            'status'=>'200',
            'msg'=>'Delete Success'
        ]);
        }   
    }

        public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'id'=> 'required',
            'name' => 'required',
            'mob' => 'required',
            'email' => 'required',
            'address' => 'required',
            'image' => 'image|mimes:jpg,png,jpeg|max:2048'
        ]);

        if ($validator->fails()) 
        {
            return response()->json([
                'status' => '422',
                'error' => $validator->errors()
            ]);
        }else{
            $insert = insert::find($request->id);
            if (!$insert) {
                return response()->json([
                    'message' => 'User not found'], 404
                );
            }
            if ($request->image!="") 
            { if ($insert->image!=null && file_exists(public_path('uploads/'.$insert->image))) {
                unlink(public_path('uploads/'.$insert->image));
              }
              $imageName = time().'.'.$request->image->extension();
              $request->image->move(public_path('uploads'), $imageName);
              $insert->image=$imageName;
            }
            $insert->name=$request->name;
            $insert->mob=$request->mob;
            $insert->email=$request->email;
            $insert->address=$request->address;
            $insert->save();
            return response()->json([
                'status'=>'200',
                'msg'=>'Data Update Successful'
            ]);
        }
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'mob' => 'required',
            'email' => 'required',
            'address' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg|max:2048'
        ]);

        if ($validator->fails()) 
        {
            return response()->json([
                'status' => '422',
                'error' => $validator->errors()
            ]);
        }else{
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('uploads'), $imageName);
            $model = new insert();
            $model->name=$request->name;
            $model->mob=$request->mob;
            $model->email=$request->email;
            $model->address=$request->address;
            $model->image=$imageName;
            $model->save();
            return response()->json([
                'status'=>'200',
                'msg'=>'Data Insert Successful'
            ]);
        }
    }
}
