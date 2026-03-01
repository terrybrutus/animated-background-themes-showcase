import OrderedMap "mo:base/OrderedMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor AnimatedBackgroundThemesShowcase {

  transient let textMap = OrderedMap.Make<Text>(Text.compare);

  var themes = textMap.empty<Text>();

  public func getThemes() : async [(Text, Text)] {
    Iter.toArray(textMap.entries(themes));
  };
};
