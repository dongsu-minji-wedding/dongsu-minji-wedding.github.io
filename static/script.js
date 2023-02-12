// 특정 DOM 의 절대 위치 정보를 조회한다.
function getAbsolutePosition(elem) {
  var r = elem.getBoundingClientRect();
  return {
    top: r.top + window.scrollY,
    bottom: r.bottom + window.scrollY
  }
}

// 특정 DOM 의 Top 을 조회한다.
function getAbsoluteTop(elem) {
  return getAbsolutePosition(elem).top
}

(function () {
  var $body = document.body;
  var $pgHolder = document.getElementById("playground-holder");
  var $pg = document.getElementById("playground");
  var $storyEach = document.getElementById("story-each");
  var $storyTogether = document.getElementById("story-together");

  var $jyThumb = document.getElementById("jaeyoung-thumb");
  // var $jyIcon = $jyThumb.children[0];
  var $jyContents = Array.from(document.getElementsByClassName("content jaeyoung"));
  var $syThumb = document.getElementById("soyoung-thumb");
  // var $syIcon = $syThumb.children[0];
  var $syContents = Array.from(document.getElementsByClassName("content soyoung"));
  var $togetherContent = document.getElementsByClassName("content together")[0];

  var jyIconHolders = ['baby', 'boy', 'man', 'couple'];
  var syIconHolders = ['baby', 'girl', 'woman', 'couple'];

  // 동적으로 Dom 의 사이즈가 변경될 수 도 있으니 (이미지 로딩 등),
  // 그냥 매번 계산한다. 현대의 브라우져를 구동하는 단말기들은 생각보다 강력하다.
  /*
  function updatePlayground(e) {
    // Playground Holder 의 위치를 정의
    var pgHolderPosition = getAbsolutePosition($pgHolder);

    // Story 의 영역을 결정하는 위치가 story 영역 안쪽에 있을 때 Placeholder 노출을 결정
    var storyEachToken = "on-story-each";
    var storyAfterToken = "after-story-each";
    var storyEachDecider = window.innerHeight + window.scrollY;
    var storyEachPosition = getAbsolutePosition($storyEach);
    if (storyEachDecider > storyEachPosition.top + 1 && storyEachDecider <= pgHolderPosition.bottom) {
      $body.classList.add(storyEachToken);
      $body.classList.remove(storyAfterToken);
    } else if (storyEachDecider > pgHolderPosition.bottom) {
      $body.classList.remove(storyEachToken);
      $body.classList.add(storyAfterToken);
    } else {
      $body.classList.remove(storyEachToken);
      $body.classList.remove(storyAfterToken);
    }

    var togetherContentTop = getAbsoluteTop($togetherContent);

      var jyTops = $jyContents.map(getAbsoluteTop);
      var jyLevel = jyTops.findLastIndex(function (value) { return value < storyEachDecider; });
      $jyIcon.classList.remove(...jyIconHolders);
    if (jyLevel < 0) {
      $jyThumb.style.display = "none";
      $jyThumb.style.left = 0;
      $jyThumb.style.transform = "none";
      $jyIcon.classList.add(jyIconHolders[0]);
    } else if (storyEachDecider >= togetherContentTop) {
      $syThumb.style.display = "block";
      $jyThumb.style.left = "50%";
      $jyThumb.style.transform = "translateX(-50%)";
      $jyIcon.classList.add(jyIconHolders[jyIconHolders.length - 1]);
    } else {
      $jyThumb.style.display = "block";
      $jyThumb.style.left = jyLevel / (jyTops.length * 2) * 100 + "%";
      $jyThumb.style.transform = "none";
      $jyIcon.classList.add(jyIconHolders[jyLevel]);
    }

    var syTops = $syContents.map(getAbsoluteTop);
    var syLevel = syTops.findLastIndex(function (value) { return value < storyEachDecider; });
    $syIcon.classList.remove(...syIconHolders);
    if (syLevel < 0) {
      $syThumb.style.display = "none";
      $syThumb.style.right = 0;
      $syThumb.style.transform = "none";
      $syIcon.classList.add(syIconHolders[0]);
    } else if (storyEachDecider >= togetherContentTop) {
      $syThumb.style.display = "block";
      $syThumb.style.right = "50%";
      $syThumb.style.transform = "translateX(50%)";
      $syIcon.classList.add(syIconHolders[syIconHolders.length - 1]);
    } else {
      $syThumb.style.display = "block";
      $syThumb.style.right = syLevel / (syTops.length * 2) * 100 + "%";
      $syThumb.style.transform = "none";
      $syIcon.classList.add(syIconHolders[syLevel]);
    }
  }
  */
  // modal begin
  // Get the modal
  var modal_bride = document.getElementById("modal_bride");
  var modal_groom = document.getElementById("modal_groom");

  // Get the button that opens the modal
  var btn_bride = document.getElementById("myBtn_bride");
  var btn_groom = document.getElementById("myBtn_groom");

  // Get the <span> element that closes the modal
  var close_bride = document.getElementsByClassName("close_bride")[0];
  var close_groom = document.getElementsByClassName("close_groom")[0];

  // When the user clicks on the button, open the modal
  btn_bride.onclick = function () {
    modal_bride.style.display = "block";
  }
  btn_groom.onclick = function () {
    modal_groom.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  close_bride.onclick = function () {
    modal_bride.style.display = "none";
  }
  close_groom.onclick = function () {
    modal_groom.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal_bride) {
      modal_bride.style.display = "none";
    }
    if (event.target == modal_groom) {
      modal_groom.style.display = "none";
    }
  };

  // modal ends

  var $photosetRows = Array.from(document.getElementsByClassName("photoset-row"));
  var photoMargin = 2;
  function resizeImages(e) {
    $photosetRows.forEach(function ($row) {
      var $photoSet = $row.parentNode,
        wholeWidth = $photoSet.offsetWidth,
        n = $row.children.length,
        exactWidth = wholeWidth - (n - 1) * 2 * photoMargin,
        $images = [],
        totalRatio = 0;

      Array.from($row.children).forEach(function ($figure) {
        var image = $figure.children[0].children[0];
        totalRatio += parseFloat(image.getAttribute("data-ratio"));
        $images.push(image);
      });

      $images.forEach(function ($image) {
        var ratio = parseFloat($image.getAttribute("data-ratio"));
        var width = exactWidth * ratio / totalRatio;

        // 가로/세로 비가 ratio 로 들어감
        $image.width = width;
        $image.height = width / ratio;
        $image.src = $image.getAttribute("data-src");

        // 열었을 때 크기
        var parent = $image.parentNode;
        parent.dataset.pswpWidth = wholeWidth;
        parent.dataset.pswpHeight = wholeWidth * 1.5 / ratio;
      });
    });
  }

  var throttler;
  function throttle(e, func) {
    if (!throttler) {
      throttler = setTimeout(function () {
        throttler = null;
        func(e)
      }, 66) // 15fps
    }
  }

  document.addEventListener("scroll", function (e) {
    // throttle(e, updatePlayground);
  });

  window.addEventListener("resize", function (e) {
    throttle(e, function (e2) {
      resizeImages(e2);
      // updatePlayground(e2);
    });
  });

  document.addEventListener("DOMContentLoaded", function (e) {
    throttle(e, function (e2) {
      resizeImages(e2);
      // updatePlayground(e2);
    });
  });

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    var storyEachToken = "on-story-each";

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 0;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
        $body.classList.add(storyEachToken);
      } else {
        reveals[i].classList.remove("active");
        $body.classList.remove(storyEachToken);
      }
    }
  }

  document.addEventListener("scroll", function (e) {
    throttle(e, reveal);
  });

  // goto
  document.addEventListener('click', function (e) {
    if (!e.target) { return }

    var $a = e.target.closest('a');
    if (!$a) { return }


    if ($a.classList.contains('go-to')) {
      e.preventDefault();

      var href = $a.getAttribute('href');
      var marginTop = $a.getAttribute('data-margin-top');
      var $target = document.getElementById(href.replace('#', ''));
      if ($target) {
        var targetTop = getAbsolutePosition($target).top;
        if (marginTop) { targetTop -= parseFloat(marginTop) }

        scroll({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    } else if ($a.classList.contains('share')) {
      e.preventDefault();
      window.navigator.share({
        title: '2023.04.23. 안동수♥김민지 결혼합니다',
        text: '은은하게 든든히\n\n2023년 4월 23일 오후 3시\n마리아쥬 스퀘어',
        url: 'https://dongsu-minji-wedding.github.io/',
      });
    }
  });

}).call(this);
