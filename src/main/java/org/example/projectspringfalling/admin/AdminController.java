package org.example.projectspringfalling.admin;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class AdminController {
    private final AdminService adminService;
    private final HttpSession session;
    private final RedisTemplate<String, Object> rt;

    // 앨범 상세보기
    @GetMapping("/admin/albums/{id}")
    public String albumDetail(@PathVariable Integer id, HttpServletRequest request) {
        request.setAttribute("album", adminService.getAlbum(id));
        return "admin/album-detail";
    }

    // 앨범 목록보기
    @GetMapping("/admin/albums")
    public String albumList(HttpServletRequest request) {
        request.setAttribute("albumList", adminService.getAlbumList());
        return "admin/album-list";
    }

    // 앨범 등록하기 폼
    @GetMapping("/admin/albums/save-form")
    public String albumSaveForm() {
        return "admin/album-save-form";
    }

    // 가수 상세보기
    @GetMapping("/admin/artists/{id}")
    public String artistDetail(@PathVariable Integer id, HttpServletRequest request) {
        request.setAttribute("artist", adminService.getArtist(id));
        return "admin/artist-detail";
    }

    // 가수 목록보기
    @GetMapping("/admin/artists")
    public String artistList(HttpServletRequest request) {
        request.setAttribute("artistList", adminService.getArtistList());

        return "admin/artist-list";
    }

    // 가수 등록하기 폼
    @GetMapping("/admin/artists/save-form")
    public String artistSaveForm() {
        return "admin/artist-save-form";
    }

    // 신고 목록 보기
    @GetMapping("/admin/reports")
    public String reportList(HttpServletRequest request) {
        request.setAttribute("reportList", adminService.getReportList());
        return "admin/report-list";
    }

    // 신고 상세보기
    @GetMapping("/admin/reports/{id}")
    public String reportDetail(@PathVariable Integer id, HttpServletRequest request) {
        request.setAttribute("report", adminService.getReportById(id));
        return "admin/report-detail";
    }

    // 곡 상세보기
    @GetMapping("/admin/songs/{id}")
    public String songDetail(@PathVariable Integer id, HttpServletRequest request) {
        request.setAttribute("song", adminService.getSong(id));
        return "admin/song-detail";
    }

    // 곡 목록보기
    @GetMapping("/admin/songs")
    public String songList(Model model) {
        model.addAttribute("songList", adminService.getSongList());
        return "admin/song-list";
    }

    // 회원 상세보기
    @GetMapping("/admin/users/{id}")
    public String userDetail(@PathVariable Integer id, Model model) {
        model.addAttribute("user", adminService.getUser(id));

        return "admin/user-detail";
    }

    // 회원 목록보기
    @GetMapping("/admin/users")
    public String userList(Model model) {

        model.addAttribute("userList", adminService.getUserList());

        return "admin/user-list";
    }

    // 로그인 페이지
    @GetMapping("/admin")
    public String loginForm() {
        return "admin/login-form";
    }

    // 로그인
    @PostMapping("/admin/login")
    public String login(AdminRequest.LoginDTO reqDTO) {
        Admin sessionAdmin = adminService.login(reqDTO);
        rt.opsForValue().set("sessionAdmin:" + sessionAdmin.getId(), sessionAdmin);
        session.setAttribute("sessionAdmin", sessionAdmin);
        return "redirect:/admin/albums";
    }

    // 로그아웃
    @GetMapping("/admin/logout")
    public String logout() {
        Admin sessionAdmin = (Admin) session.getAttribute("sessionAdmin");
        rt.delete("sessionAdmin" + sessionAdmin.getId());
        session.invalidate();
        return "redirect:/admin";
    }
}
