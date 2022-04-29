//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require jquery_ujs
//= require_tree .

import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

// JSのファイルを作るときにここで読み込ませる必要有
require("@rails/activestorage").start();
require("trix");
require("@rails/actiontext");
require("jquery");
require("channels/materialize");
require("channels/common");
require("channels/like");
require("channels/copy");
require("channels/form");
require("channels/comment");
require("channels/sort");
require("channels/kaminari");
require("channels/dev-mark");
require("channels/user_new_validation");
require("channels/user_edit_validation");
require("channels/carousel");
require("channels/modal");
require("channels/chips");
require("channels/idea_validation");
require("channels/header_scroll");
