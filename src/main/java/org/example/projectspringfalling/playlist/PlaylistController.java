package org.example.projectspringfalling.playlist;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.example.projectspringfalling.RestAPI.RestResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class PlaylistController {
    private final PlaylistService playlistService;
    private final HttpSession session;

    // 보관함 페이지
    @GetMapping("/storage")
    public String storage() {
        return "playlist/storage";
    }

    // 플레이리스트 보기
    @GetMapping("/playlists/{playlistId}")
    public String playlist(Model model, @PathVariable Integer playlistId) {
        PlaylistResponse.PlaylistDetailDTO resp = playlistService.playlistDetail(playlistId);
        model.addAttribute("playlist", resp);
        return "playlist/playlist";
    }

    // 현재 재생중인 플레이리스트
    @GetMapping("/playlists/current")
    public String currentPlaylist(Model model) {
        List<RestResponse.PlaylistDTO> songs = playlistService.musicTest();
        model.addAttribute("songs", songs);
//        return "playlist/current-test";
        return "playlist/current-playlist";
    }

}
