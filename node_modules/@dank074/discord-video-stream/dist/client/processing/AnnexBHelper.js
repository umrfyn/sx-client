export var H264NalUnitTypes;
(function (H264NalUnitTypes) {
    H264NalUnitTypes[H264NalUnitTypes["Unspecified"] = 0] = "Unspecified";
    H264NalUnitTypes[H264NalUnitTypes["CodedSliceNonIDR"] = 1] = "CodedSliceNonIDR";
    H264NalUnitTypes[H264NalUnitTypes["CodedSlicePartitionA"] = 2] = "CodedSlicePartitionA";
    H264NalUnitTypes[H264NalUnitTypes["CodedSlicePartitionB"] = 3] = "CodedSlicePartitionB";
    H264NalUnitTypes[H264NalUnitTypes["CodedSlicePartitionC"] = 4] = "CodedSlicePartitionC";
    H264NalUnitTypes[H264NalUnitTypes["CodedSliceIdr"] = 5] = "CodedSliceIdr";
    H264NalUnitTypes[H264NalUnitTypes["SEI"] = 6] = "SEI";
    H264NalUnitTypes[H264NalUnitTypes["SPS"] = 7] = "SPS";
    H264NalUnitTypes[H264NalUnitTypes["PPS"] = 8] = "PPS";
    H264NalUnitTypes[H264NalUnitTypes["AccessUnitDelimiter"] = 9] = "AccessUnitDelimiter";
    H264NalUnitTypes[H264NalUnitTypes["EndOfSequence"] = 10] = "EndOfSequence";
    H264NalUnitTypes[H264NalUnitTypes["EndOfStream"] = 11] = "EndOfStream";
    H264NalUnitTypes[H264NalUnitTypes["FillerData"] = 12] = "FillerData";
    H264NalUnitTypes[H264NalUnitTypes["SEIExtenstion"] = 13] = "SEIExtenstion";
    H264NalUnitTypes[H264NalUnitTypes["PrefixNalUnit"] = 14] = "PrefixNalUnit";
    H264NalUnitTypes[H264NalUnitTypes["SubsetSPS"] = 15] = "SubsetSPS";
})(H264NalUnitTypes || (H264NalUnitTypes = {}));
export var H265NalUnitTypes;
(function (H265NalUnitTypes) {
    H265NalUnitTypes[H265NalUnitTypes["TRAIL_N"] = 0] = "TRAIL_N";
    H265NalUnitTypes[H265NalUnitTypes["TRAIL_R"] = 1] = "TRAIL_R";
    H265NalUnitTypes[H265NalUnitTypes["TSA_N"] = 2] = "TSA_N";
    H265NalUnitTypes[H265NalUnitTypes["TSA_R"] = 3] = "TSA_R";
    H265NalUnitTypes[H265NalUnitTypes["STSA_N"] = 4] = "STSA_N";
    H265NalUnitTypes[H265NalUnitTypes["STSA_R"] = 5] = "STSA_R";
    H265NalUnitTypes[H265NalUnitTypes["RADL_N"] = 6] = "RADL_N";
    H265NalUnitTypes[H265NalUnitTypes["RADL_R"] = 7] = "RADL_R";
    H265NalUnitTypes[H265NalUnitTypes["RASL_N"] = 8] = "RASL_N";
    H265NalUnitTypes[H265NalUnitTypes["RASL_R"] = 9] = "RASL_R";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL_N10"] = 10] = "RSV_VCL_N10";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL_R11"] = 11] = "RSV_VCL_R11";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL_N12"] = 12] = "RSV_VCL_N12";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL_R13"] = 13] = "RSV_VCL_R13";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL_N14"] = 14] = "RSV_VCL_N14";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL_R15"] = 15] = "RSV_VCL_R15";
    H265NalUnitTypes[H265NalUnitTypes["BLA_W_LP"] = 16] = "BLA_W_LP";
    H265NalUnitTypes[H265NalUnitTypes["BLA_W_RADL"] = 17] = "BLA_W_RADL";
    H265NalUnitTypes[H265NalUnitTypes["BLA_N_LP"] = 18] = "BLA_N_LP";
    H265NalUnitTypes[H265NalUnitTypes["IDR_W_RADL"] = 19] = "IDR_W_RADL";
    H265NalUnitTypes[H265NalUnitTypes["IDR_N_LP"] = 20] = "IDR_N_LP";
    H265NalUnitTypes[H265NalUnitTypes["CRA_NUT"] = 21] = "CRA_NUT";
    H265NalUnitTypes[H265NalUnitTypes["RSV_IRAP_VCL22"] = 22] = "RSV_IRAP_VCL22";
    H265NalUnitTypes[H265NalUnitTypes["RSV_IRAP_VCL23"] = 23] = "RSV_IRAP_VCL23";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL24"] = 24] = "RSV_VCL24";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL25"] = 25] = "RSV_VCL25";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL26"] = 26] = "RSV_VCL26";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL27"] = 27] = "RSV_VCL27";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL28"] = 28] = "RSV_VCL28";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL29"] = 29] = "RSV_VCL29";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL30"] = 30] = "RSV_VCL30";
    H265NalUnitTypes[H265NalUnitTypes["RSV_VCL31"] = 31] = "RSV_VCL31";
    H265NalUnitTypes[H265NalUnitTypes["VPS_NUT"] = 32] = "VPS_NUT";
    H265NalUnitTypes[H265NalUnitTypes["SPS_NUT"] = 33] = "SPS_NUT";
    H265NalUnitTypes[H265NalUnitTypes["PPS_NUT"] = 34] = "PPS_NUT";
    H265NalUnitTypes[H265NalUnitTypes["AUD_NUT"] = 35] = "AUD_NUT";
    H265NalUnitTypes[H265NalUnitTypes["EOS_NUT"] = 36] = "EOS_NUT";
    H265NalUnitTypes[H265NalUnitTypes["EOB_NUT"] = 37] = "EOB_NUT";
    H265NalUnitTypes[H265NalUnitTypes["FD_NUT"] = 38] = "FD_NUT";
    H265NalUnitTypes[H265NalUnitTypes["PREFIX_SEI_NUT"] = 39] = "PREFIX_SEI_NUT";
    H265NalUnitTypes[H265NalUnitTypes["SUFFIX_SEI_NUT"] = 40] = "SUFFIX_SEI_NUT";
    H265NalUnitTypes[H265NalUnitTypes["RSV_NVCL41"] = 41] = "RSV_NVCL41";
    H265NalUnitTypes[H265NalUnitTypes["RSV_NVCL42"] = 42] = "RSV_NVCL42";
    H265NalUnitTypes[H265NalUnitTypes["RSV_NVCL43"] = 43] = "RSV_NVCL43";
    H265NalUnitTypes[H265NalUnitTypes["RSV_NVCL44"] = 44] = "RSV_NVCL44";
    H265NalUnitTypes[H265NalUnitTypes["RSV_NVCL45"] = 45] = "RSV_NVCL45";
    H265NalUnitTypes[H265NalUnitTypes["RSV_NVCL46"] = 46] = "RSV_NVCL46";
    H265NalUnitTypes[H265NalUnitTypes["RSV_NVCL47"] = 47] = "RSV_NVCL47";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC48"] = 48] = "UNSPEC48";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC49"] = 49] = "UNSPEC49";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC50"] = 50] = "UNSPEC50";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC51"] = 51] = "UNSPEC51";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC52"] = 52] = "UNSPEC52";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC53"] = 53] = "UNSPEC53";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC54"] = 54] = "UNSPEC54";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC55"] = 55] = "UNSPEC55";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC56"] = 56] = "UNSPEC56";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC57"] = 57] = "UNSPEC57";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC58"] = 58] = "UNSPEC58";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC59"] = 59] = "UNSPEC59";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC60"] = 60] = "UNSPEC60";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC61"] = 61] = "UNSPEC61";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC62"] = 62] = "UNSPEC62";
    H265NalUnitTypes[H265NalUnitTypes["UNSPEC63"] = 63] = "UNSPEC63";
})(H265NalUnitTypes || (H265NalUnitTypes = {}));
;
export const H264Helpers = {
    getUnitType(frame) {
        return frame[0] & 0x1f;
    },
    splitHeader(frame) {
        return [frame.subarray(0, 1), frame.subarray(1)];
    },
    isAUD(unitType) {
        return unitType === H264NalUnitTypes.AccessUnitDelimiter;
    }
};
export const H265Helpers = {
    getUnitType(frame) {
        return (frame[0] >> 1) & 0x3f;
    },
    splitHeader(frame) {
        return [frame.subarray(0, 2), frame.subarray(2)];
    },
    isAUD(unitType) {
        return unitType === H265NalUnitTypes.AUD_NUT;
    }
};
// Get individual NAL units from an AVPacket frame
export function splitNalu(frame) {
    const nalus = [];
    let offset = 0;
    while (offset < frame.length) {
        const naluSize = frame.readUInt32BE(offset);
        offset += 4;
        const nalu = frame.subarray(offset, offset + naluSize);
        nalus.push(nalu);
        offset += nalu.length;
    }
    return nalus;
}
// Merge NAL units into an AVPacket frame
export function mergeNalu(nalus) {
    const chunks = [];
    for (const nalu of nalus) {
        const size = Buffer.allocUnsafe(4);
        size.writeUInt32BE(nalu.length);
        chunks.push(size, nalu);
    }
    return Buffer.concat(chunks);
}
