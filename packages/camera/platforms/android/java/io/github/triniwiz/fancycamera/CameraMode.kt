package io.github.triniwiz.fancycamera

enum class CameraMode constructor(val value: Int) {
  PHOTO(0),
  VIDEO(1),
  ;

  companion object {
    fun from(value: Int): CameraMode = values().first { it.value == value }
  }
}
