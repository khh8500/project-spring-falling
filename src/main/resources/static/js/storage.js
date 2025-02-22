$(document).ready(function () {
    // 보관함 컨텐츠 가져오기 함수
    function getContent(url, pageCallback) {
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $("#storage-tab-content").html(pageCallback(data.body))
            },
            error: function () {
                alert("데이터 가져오기 실패");
            }
        })
    }

    // 선택된 탭 하이라이트
    function updateTabHighlight() {
        const $selectedTab = $('.storage-tab.selected-tab');
        const left = $selectedTab.position().left;
        const width = $selectedTab.outerWidth();
        $('.highlight').css({left: left, width: width});
    }

    // 탭 클릭시 이벤트(ajax, 탭 하이라이트)
    $('.storage-tab').click(function () {
        $('.storage-tab').removeClass('selected-tab');
        $(this).addClass('selected-tab');
        updateTabHighlight();

        const tab = $(this).data('tab');
        switch (tab) {
            case 'tab1':
                getContent('/storage/my-list', myList);
                break;
            case 'tab2':
                getContent('/storage/like-song', likeSongs);
                break;
            case 'tab3':
                getContent('/storage/like-album', likeAlbums);
                break;
            case 'tab4':
                getContent('/storage/like-artist', likeArtists);
                break;
            case 'tab5':
                getContent('/storage/recent-song', recentSongs);
                break;
        }
    });

    // 내 리스트
    function myList(body) {
        return "<div class=\"storage-tabs-mylist-items\">" + body.map(item => {
            return `
            <div class="storage-tabs-mylist-item">
                <input class="storage-playlist-id" type="hidden" value="${item.playlistId}">
                <a href="#">
                    <img src="..${item.albumImg}" onerror="this.src='/images/logo_2.png'" alt="Playlist">
                </a>
                <div class="storage-tabs-mylist-item-info">
                    <a href="#">
                        <h3 style="font-weight: 600;">${item.playlistName}</h3>
                    </a>
                    <a href="#">
                        <p>총 ${item.playlistSongCount}곡</p>
                    </a>
                    <a href="#">
                        <p>${item.createdAt}</p>
                    </a>
                    <br>
                    <div class="storage-tabs-mylist-item-icons">
                        <a href="#"><i class="album-icon fas fa-list icon"></i></a>
                        <a href="#"><i class="album-icon fas fa-folder-plus custom-icon"></i></a>
                    </div>
                </div>
            </div>
            `;
        }).join('') + "</div>";
    }

    // 좋아요 - 곡
    function likeSongs(body) {
        return `<div class="storage-tabs-like-chart">
        <div class="storage-tabs-like-chart-playall">
            <div>▷ 전체듣기</div>
        </div>
        <table class="storage-tabs-like-chart-main-table">
            <tr class="storage-tabs-like-chart-main-table-header">
                <th><input type="checkbox"></th>
                <th>곡/앨범</th>
                <th>아티스트</th>
                <th>듣기</th>
                <th>재생목록</th>
                <th>내 리스트</th>
                <th>더보기</th>
            </tr>` + body.map(item => {
            return `
            <tr class="storage-tabs-like-chart-main-table-body">
                <td><input type="checkbox"></td>
                <td>
                    <div class="storage-tabs-like-chart-main-table-body-img">
                        <input class="storage-like-song-list-song-id" type="hidden" value="${item.songId}">
                        <input class="storage-like-song-list-album-id" type="hidden" value="${item.albumId}">
                        <img class="storage-tabs-like-chart-img" src="..${item.albumImg}"
                             alt="${item.albumTitle}">
                        <span>
                                <div>${item.songName}</div>
                                <div class="storage-tabs-like-chart-album-name">${item.albumTitle}</div>
                            </span>
                    </div>
                </td>

                <td>${item.artistName}</td>
                <td><i class="fa-solid fa-play"></i></td>
                <td><i class="fa-solid fa-list-ul"></i></td>
                <td><i class="fa-solid fa-folder-plus"></i></td>
                <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
            </tr>
            `;
        }).join('') + `</table>
    </div>`;
    }

    // 좋아요 - 앨범
    function likeAlbums(body) {
        return `<div class="storage-tabs-mylist-items">` + body.map(item => {
            return `
            <div class="storage-tabs-mylist-item">
            <input class="storage-like-album-list-album-id" type="hidden" value="${item.albumId}">
            <a href="#">
                <img src="..${item.albumImg}" alt="${item.albumTitle}">
            </a>
            <div class="storage-tabs-mylist-item-info">
                <a href="#">
                    <h3 style="font-weight: 600;">${item.albumTitle}</h3>
                </a>
                <a href="#">
                    <p>${item.artistName}</p>
                </a>
                <a href="#">
                    <p>${item.albumType}</p>
                </a>
                <a href="#">
                    <p>${item.createdAt}</p>
                </a>
                <br>
                <div class="storage-tabs-mylist-item-icons">
                    <a href="#"><i class="album-icon fas fa-list icon"></i></a>
                    <a href="#"><i class="album-icon fas fa-folder-plus custom-icon"></i></a>
                </div>
            </div>
        </div>
            `;
        }).join('') + `</div>`;
    }

    // 좋아요 - 아티스트
    function likeArtists(body) {
        return `<div class="storage-tabs-like-artists">` + body.map(item => {
            return `
            <div class="storage-tabs-like-artist-box">
            <input class="storage-like-artist-list-album-id" type="hidden" value="${item.artistId}">
            <div class="storage-tabs-like-artist-img-container">
                <a href="#">
                    <img src="..${item.artistImg}" alt="${item.artistName}">
                    <button class="storage-tabs-like-artist-play-button">▶</button>
                </a>
            </div>
            <div class="storage-tabs-like-artist-info">
                <div class="storage-tabs-like-artist-name">${item.artistName}</div>
                <div class="storage-tabs-like-artist-role">${item.artistType}</div>
                <div class="storage-tabs-like-artist-play">▷ 인기곡 듣기</div>
            </div>
        </div>
            `;
        }).join('') + `</div>`;
    }

    // 최근 감상
    function recentSongs(body) {
        return `
        <div class="storage-tabs-like-chart">
        <div class="storage-tabs-like-chart-playall">
            <div>▷ 전체듣기</div>
        </div>
        <table class="storage-tabs-like-chart-main-table">
            <tr class="storage-tabs-like-chart-main-table-header">
                <th><input type="checkbox"></th>
                <th>곡/앨범</th>
                <th>아티스트</th>
                <th>듣기</th>
                <th>재생목록</th>
                <th>내 리스트</th>
                <th>더보기</th>
            </tr>` + body.map(item => {
            return `
            <tr class="storage-tabs-like-chart-main-table-body">
                <input class="storage-like-artist-list-album-id" type="hidden" value="${item.songId}">
                <td><input type="checkbox"></td>
                <td>
                    <div class="storage-tabs-like-chart-main-table-body-img">
                        <img class="storage-tabs-like-chart-img" src="..${item.albumImg}"
                             alt="${item.songName}">
                        <span>
                            <div>${item.songName}</div>
                            <div class="storage-tabs-like-chart-album-name">${item.albumTitle}</div>
                        </span>
                    </div>
                </td>

                <td>${item.artistName}</td>
                <td><i class="fa-solid fa-play"></i></td>
                <td><i class="fa-solid fa-list-ul"></i></td>
                <td><i class="fa-solid fa-folder-plus"></i></td>
                <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
            </tr>
            `;
        }).join('') + `</table>
    </div>`;
    }

    getContent('/storage/my-list', myList);
    updateTabHighlight();

});