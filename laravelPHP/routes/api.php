<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\SongController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\AlbumController;
use App\Http\Controllers\API\GenreController;
use App\Http\Controllers\API\ArtistController;
use App\Http\Controllers\API\PlaylistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [UserController::class, 'login']);
Route::post('/sign-up', [UserController::class, 'signup']);
Route::post('/updateAvatar', [UserController::class, 'updateAvatar']);
Route::post('/getUserInfo', [UserController::class, 'getUserInfo']);
Route::post('/getAllUserInfo', [UserController::class, 'getAllUserInfo']);
Route::post('/changePass', [UserController::class, 'changePass']);
Route::post('/updateUser', [UserController::class, 'updateUser']);
Route::post('/deleteUser', [UserController::class, 'deleteUser']);
Route::post('/checkSuperAdminPassword', [UserController::class, 'checkSuperAdminPassword']);

Route::post('/getGenresSong', [SongController::class, 'getSongOfGenre']);
Route::post('/getArtistsSong', [SongController::class, 'getSongOfArtist']);
Route::post('/getSongInfo', [SongController::class, 'getSongInfo']);
Route::post('/getSongOfAlbum', [SongController::class, 'getSongOfAlbum']);
Route::post('/updateViewSong', [SongController::class, 'updateViewSong']);
Route::post('/getTopView', [SongController::class, 'getTopView']);
Route::post('/getAllSongInfo', [SongController::class, 'getAllSongInfo']);
Route::post('/getOneSongDetail', [SongController::class, 'getOneSongDetail']);
Route::post('/deleteOneSong', [SongController::class, 'deleteOneSong']);
Route::post('/updateOneSong', [SongController::class, 'updateOneSong']);
Route::post('/getSongNumberOfAnArtist', [SongController::class, 'getSongNumberOfAnArtist']);
Route::post('/getAlbumStatistic', [SongController::class, 'getAlbumStatistic']);
Route::post('/getTotalSong', [SongController::class, 'getTotalSong']);
Route::post('/insertSongArtistRelation', [SongController::class, 'insertSongArtistRelation']);
Route::post('/insertSongGenreRelation', [SongController::class, 'insertSongGenreRelation']);
Route::post('/postNewSong', [SongController::class, 'postNewSong']);
Route::post('/getListenHistory', [SongController::class, 'getListenHistory']);



Route::post('/postSongComment',[CommentController::class, 'postSongComment']);
Route::post('/getUserComment',[CommentController::class, 'getUserComment']);
Route::post('/getAllSongComment',[CommentController::class, 'getAllSongComment']);
Route::post('/postPlaylistComment',[CommentController::class,'postPlaylistComment']);
Route::post('/getAllPlaylistComment',[CommentController::class,'getAllPlaylistComment']);

Route::post('/getAllAlbumInfo',[AlbumController::class, 'getAllAlbumInfo']);
Route::post('/deleteOneAlbum',[AlbumController::class, 'deleteOneAlbum']);
Route::post('/getOneAlbumInfo',[AlbumController::class, 'getOneAlbumInfo']);
Route::post('/getAlbumId',[AlbumController::class, 'getAlbumId']);
Route::post('/updateOneAlbum',[AlbumController::class, 'updateOneAlbum']);
Route::post('/postNewAlbum', [AlbumController::class, 'postNewAlbum']);


Route::post('/getAllArtistInfo',[ArtistController::class, 'getAllArtistInfo']);
Route::post('/getOneArtistInfo',[ArtistController::class, 'getOneArtistInfo']);
Route::post('/getArtistId',[ArtistController::class, 'getArtistId']);
Route::post('/deleteOneArtist',[ArtistController::class, 'deleteOneArtist']);
Route::post('/updateOneArtist',[ArtistController::class, 'updateOneArtist']);
Route::post('/postNewArtist', [ArtistController::class, 'postNewArtist']);

Route::post('/getGenreInfoById',[GenreController::class, 'getGenreInfoById']);
Route::post('/getAllGenreInfo',[GenreController::class, 'getAllGenreInfo']);
Route::post('/postNewGenre', [GenreController::class, 'postNewGenre']);
Route::post('/deleteOneGenre',[GenreController::class, 'deleteOneGenre']);
Route::post('/updateOneGenre',[GenreController::class, 'updateOneGenre']);
Route::post('/getGenreId',[GenreController::class, 'getGenreId']);

Route::post('/getPlaylistCreatedByUser',[PlaylistController::class, 'getPlaylistCreatedByUser']);
Route::post('/getPlaylistSharedByOther',[PlaylistController::class, 'getPlaylistSharedByOther']);
Route::post('/isAccessible',[PlaylistController::class, 'isAccessible']);
Route::post('/createUserPlaylist',[PlaylistController::class, 'createUserPlaylist']);
Route::post('/getVerifyCode',[PlaylistController::class, 'getVerifyCode']);
Route::post('/checkVerifyCode',[PlaylistController::class, 'checkVerifyCode']);
Route::post('/addSongToPlaylist',[PlaylistController::class, 'addSongToPlaylist']);
Route::post('/checkPlaylistMaker',[PlaylistController::class, 'checkPlaylistMaker']);
Route::post('/getPlaylistInfo',[PlaylistController::class, 'getPlaylistInfo']);
Route::post('/getPlaylistSong',[PlaylistController::class, 'getPlaylistSong']);
Route::post('/deleteSongFromPlaylist',[PlaylistController::class, 'deleteSongFromPlaylist']);
Route::post('/renamePlaylist',[PlaylistController::class, 'renamePlaylist']);
Route::post('/deletePlaylist',[PlaylistController::class, 'deletePlaylist']);





