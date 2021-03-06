<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SongComment;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\PlaylistComment;

class CommentController extends Controller{
    public function getUserComment(Request $request){
        $userId = $request->input('userId');
        $userComment = DB::table('User')->where('userId',$userId)->get();
        if ($userComment->isEmpty() == false){
            return response()->json([
                'status' => 200,
                'userComment' => $userComment->all(),
            ]); 
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'UserComment not found!',
            ]);
        }
    }
    
    public function postSongComment(Request $request){
        $songComment = new SongComment();
        $songComment->userId = $request->input('userId');
        $songComment->userComment = $request->input('userComment');
        $songComment->songId = $request->input('songId');
        $songComment->createdDate = Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString();
        // Be careful with this!

        $songComment->save();
        $comment = DB::table('SongComment')
            ->join('User','User.userId','=','SongComment.userId')
            ->where('SongComment.songCommentId',$songComment->songCommentId)
            ->select('songCommentId', 'fullname', 'profilePic', 'userComment','createdDate')
            ->first();
        return response()->json([
            'status' => 200,
            'message' => 'Create Song Comment Successfully',
            'comment' => $comment,
        ]);
    }

    public function getAllSongComment(Request $request){
        $songId = $request->input('songId');

        $comments = DB::table('SongComment')
            ->join('User','User.userId','=','SongComment.userId')
            ->where('SongComment.songId',$songId)
            ->select('songCommentId', 'fullname', 'profilePic', 'userComment','createdDate')->get();

        if ($comments->isEmpty() == false){
            return response()->json([
                'status' => 200,
                'comments' => $comments->all(),
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No comment!',
            ]);
        }
    }

    public function postPlaylistComment(Request $request){
        $playlistComment = new PlaylistComment();
        $playlistComment->userId = $request->input('userId');
        $playlistComment->userComment = $request->input('userComment');
        $playlistComment->playlistId = $request->input('playlistId');
        $playlistComment->createdDate = Carbon::now('Asia/Ho_Chi_Minh')->toDateTimeString();
        // Be careful with this!

        $playlistComment->save();
        $comment = DB::table('PlaylistComment')
            ->join('User','User.userId','=','PlaylistComment.userId')
            ->where('playlistCommentId',$playlistComment->playlistCommentId)
            ->select('playlistCommentId', 'fullname', 'profilePic', 'userComment','createdDate')
            ->first();

        return response()->json([
            'status' => 200,
            'message' => 'Create Playlist Comment Successfully',
            'comment' => $comment,
        ]);
    }

    public function getAllPlaylistComment(Request $request){
        $playlistId = $request->input('playlistId');

        $comments = DB::table('PlaylistComment')
            ->join('User','User.userId','=','PlaylistComment.userId')
            ->where('PlaylistComment.playlistId',$playlistId)
            ->select('playlistCommentId', 'fullname', 'profilePic', 'userComment','createdDate')->get();

        if ($comments->isEmpty() == false){
            return response()->json([
                'status' => 200,
                'comments' => $comments->all(),
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No comment.',
            ]);
        }
    }

    public function deleteSongComment(Request $request){
        //TODO (SongComment's primary key ?)
    }

    public function deletePlaylistComment(Request $request){
        //TODO (PlaylistComment's primary key ?)
    }

}
